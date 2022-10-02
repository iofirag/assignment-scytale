import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import AllPRs from './pages/AllPRs';
import NewPR from './pages/NewPR';
import NotFound from './pages/NotFound';
import PRDetail from './pages/PRDetail';

// import LoadingSpinner from './components/ui/LoadingSpinner';

// const NewQuote = React.lazy(() => import('./pages/NewQuote'));
// const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
// const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path='/'  >
            {/* <Redirect to='/prs' /> */}
          </Route>
          <Route path='/prs' element={<AllPRs />} />
          <Route path='/prs/:prId' element={<PRDetail />} />
          <Route path='/new-pr' element={<NewPR />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;