import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { ErrorBoundary, ErrorComponent, Loading } from '@/components/Common';
import { Layout } from '@/components/Layout';
import { PATH } from '@/constants/path';
import { useRouteChangeTracker } from '@/hooks/common';
import { getLocalStorage } from '@/utils/localStorage';

interface AppProps {
  hasLayout?: boolean;
}

const App = ({ hasLayout = false }: AppProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const navigate = useNavigate();
  const location = useLocation();

  useRouteChangeTracker();

  useEffect(() => {
    const isRevisit = getLocalStorage('isRevisit');

    if (!isRevisit && location.pathname === '/') {
      navigate(PATH.ONBOARDING, { replace: true });
    }
  }, [navigate, location.pathname]);

  if (!hasLayout) {
    return (
      <ErrorBoundary fallback={ErrorComponent} handleReset={reset}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary fallback={ErrorComponent} handleReset={reset}>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Outlet />
        </Layout>
      </Suspense>
    </ErrorBoundary>
  );
};
export default App;
