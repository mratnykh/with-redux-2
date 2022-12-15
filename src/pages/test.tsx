import {NextPage} from "next";
import {
    incrementAsync,
    selectCount,
    increment,
} from "../features/counter/counterSlice";
import { wrapper } from '../store';
import {useAppDispatch, useAppSelector} from "../hooks";

export const getServerSideProps = wrapper.getStaticProps(({ dispatch }) =>
  async () => {
    const action = await dispatch(incrementAsync(4));
    console.log(action)
    return { props: { count: action.payload } };
  }
);

const TestPage: NextPage = ({ count }) => {
    const dispatch = useAppDispatch();
  const selectorCount = useAppSelector(selectCount)

  return <div onClick={() => dispatch(increment())}>hello {count} {selectorCount}</div>;
}

export default TestPage
