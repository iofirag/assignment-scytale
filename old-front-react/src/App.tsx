import NewPR from './components/NewPR';
import PRFilters from './components/PRFilgers';
import PRList from './components/PRList';
import PRContextProvider from './store/pr-list-context';

function App() {
    return (
        <PRContextProvider>
            <NewPR />
            {/* <PRFilters /> Still not done */}
            <PRList />
        </PRContextProvider>
    );
}

export default App;
