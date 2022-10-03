import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import AllPRs from './pages/AllPRs';
import NewPR from './pages/NewPR';
import NotFound from './pages/NotFound';
// import PRDetail from './pages/PRDetail';

// const NewPR = React.lazy(() => import('./pages/NewPR'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));
// const AllPRs = React.lazy(() => import('./pages/AllPRs'));

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
          {/* <Route path='/prs/:prId' element={<PRDetail />} /> */}
          <Route path='/new-pr' element={<NewPR />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;