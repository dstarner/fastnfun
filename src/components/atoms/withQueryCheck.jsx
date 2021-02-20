import { useRouter } from 'next/router';

function withQueryCheck(requiredQueryParams) {
  return function Wrapper(Component) {
    return function QueryCheck(props) {
      const router = useRouter();
      for (let i = 0; i < requiredQueryParams.length; i++) {
        const value = router.query[requiredQueryParams[i]];
        if (value === undefined || value === null) {
          return null;
        }
      }
      return <Component {...props} />;
    };
  };
}

export default withQueryCheck;
