import Counter from "../components/Counter";

export const getServerSideProps = () => {
    return {
        props: { initialZustandState:  JSON.stringify({ count: 21 }) }
    };
}

const NewTestPage = () => {
    return (
        <>
            <h3>After reloading page the initial value is 21</h3>
            <Counter />
        </>
    );
};

export default NewTestPage;
