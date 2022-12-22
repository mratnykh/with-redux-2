import Counter from "../components/Counter";

export const getServerSideProps = () => {
    return {
        props: { initialZustandState: { count: 21 } }
    };
}

const NewTestPage = () => {
    return (
        <Counter />
    );
};

export default NewTestPage;
