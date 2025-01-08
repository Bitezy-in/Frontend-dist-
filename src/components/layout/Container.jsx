const Container = ({ pl = true, children }) => {
    return (
        <div
            className={`w-full lg:w-[75%] mx-auto ${
                pl ? "xl:px-20 md:px-10 sm:px-4 px-4" : "px-4"
            } pt-28`}
        >
            {children}
        </div>
    );
};

export default Container;
