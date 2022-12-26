import Counter from "../components/Counter";
import { initializeStore } from "../store";

export async function getServerSideProps() {
    const zustandStore = initializeStore({});
    const response = await fetch('http://localhost:3000/api/counter');
    const data = await response.json();

    zustandStore.getState().setCountValue(data.count);

    return {
        props: { initialZustandState: JSON.stringify(zustandStore.getState()) },
    }
}

const TestPage = () => {
    return (
        <>
            <h3>Fetches initial value and dispatch it inside getServerSideProps</h3>
            <Counter />
        </>
    );
};

export default TestPage;
