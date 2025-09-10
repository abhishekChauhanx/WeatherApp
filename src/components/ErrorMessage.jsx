 const ErrorMessage = ({ message }) => {
    return (
        <>
        <div className="error-message p-4 m-4 text-center animate-fade-in"></div>
        <div className="font-medium">⚠️ ${message}</div>
        </>
    )
};

export default ErrorMessage