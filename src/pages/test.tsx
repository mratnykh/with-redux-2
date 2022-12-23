import Counter from "../components/Counter";

export const getServerSideProps = () => {
    return {
        props: { initialZustandState: { count: 3 } }
    };
}

const TestPage = () => {
    return (
        <>
            <h3>After reloading page the initial value is 3</h3>
            <Counter />
        </>
    );
};

export default TestPage;
