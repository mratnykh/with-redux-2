import Counter from "../components/Counter";

export const getServerSideProps = () => {
    return {
        props: { initialZustandState: { count: 3 } }
    };
}

const TestPage = () => {
    return (
        <Counter />
    );
};

export default TestPage;
