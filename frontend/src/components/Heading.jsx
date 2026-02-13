const Heading = ({ title, highlight }) => {
    return (
        <h2 className="text-4xl font-bold text-dark leading-tight">
            {title}{" "}
            {highlight && (
                <span className="text-primary underline-primary">
                    {highlight}
                </span>
            )}
        </h2>
    );
};

export default Heading;
