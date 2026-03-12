import './Loader.scss'

const Loader = () => {
    return (
        <div className='loader-wrapper'>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
