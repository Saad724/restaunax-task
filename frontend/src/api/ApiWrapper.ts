import axios, { AxiosError, Method } from 'axios';
import { toast } from 'react-toastify';
import { store } from '../store/store';
import { login } from '../store/slice/AuthSlice';
import { RootState } from '../store/store';

type QueuedPromise = {
    resolve: (token: string | null) => void;
    reject: (err: unknown) => void;
};

// Track if we're currently refreshing to avoid multiple refresh calls
let isRefreshing = false;
let failedQueue: QueuedPromise[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Add response interceptor
axios.interceptors.response.use(
    (response) => {
        // You can handle and modify the response data here if needed
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if error is 401 and we haven't already tried to refresh
        if (error?.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return axios(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            // Get refresh token from Redux store (optional; add userRefreshToken to AuthState if using refresh)
            const state: RootState = store.getState();
            const refreshToken = (state.auth as { userRefreshToken?: string | null }).userRefreshToken ?? null;

            if (!refreshToken) {
                isRefreshing = false;
                processQueue(error, null);
                return Promise.reject(error);
            }

            try {
                // Call refresh token API
                const refreshResponse = await axios.post('/api/auth/refresh', {
                    refreshToken
                });

                const { session } = refreshResponse.data;
                const newAccessToken = session.accessToken;

                // Update Redux store with new tokens
                const currentState: RootState = store.getState();
                store.dispatch(
                    login({
                        data: currentState.auth.userInfo,
                        token: newAccessToken
                    })
                );

                // Update the original request with new token
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // Process queued requests
                isRefreshing = false;
                processQueue(null, newAccessToken);

                // Retry the original request
                return axios(originalRequest);
            } catch (refreshError) {
                // Refresh failed, clear auth and reject
                isRefreshing = false;
                processQueue(refreshError, null);
                
                // Clear auth state on refresh failure
                store.dispatch({ type: 'auth/logout' });
                
                return Promise.reject(refreshError);
            }
        }

        // Reject the error so it can be caught in axiosWrapper catch block
        return Promise.reject(error);
    }
);

interface AxiosConfigWithData {
    method: Method;
    url: string;
    headers: Record<string, string>;
    data?: unknown;
}

const axiosWrapper = async (
    method: Method,
    url: string,
    data?: unknown,
    token?: string | null,
    isFormData = false
): Promise<unknown> => {
    try {
        const config: AxiosConfigWithData = {
            method,
            url,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Get token from parameter or from Redux store
        const authToken = token ?? store.getState().auth?.userToken ?? null;
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }

        if (isFormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
            config.data = data;
        } else {
            if (data !== undefined) config.data = data;
        }

        const response = await axios(config);
        return response?.data;
    } catch (err: unknown) {
        const error = err as AxiosError<{
            error?: string;
            desc?: string;
            message?: string;
            validation?: { body?: { message?: string } };
        }>;
        const errorMessage =
            error.response?.data?.error ||
            error.response?.data?.desc ||
            error.response?.data?.message ||
            error.response?.data?.validation?.body?.message ||
            (error instanceof Error ? error.message : 'An error occurred');

        toast.error(errorMessage);
        throw errorMessage;
    }
};

export default axiosWrapper;
