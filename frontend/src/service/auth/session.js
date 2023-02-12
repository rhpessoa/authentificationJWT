import { authService } from "./authService";
import { useRouter } from "next/router";
import React from "react";

export function withSession(funcao) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      return funcao(modifiedCtx);
    } catch (err) {
      return {
        redirect: {
          destination: "/?error=Unauthorized",
          permanent: false,
        },
      };
    }
  };
}

export function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    authService
      .getSession()
      .then((response) => {
        setSession(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: session,
    error,
    loading,
  };
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const router = useRouter();
    const session = useSession();
    if (session.error && session.loading) {
      router.push("/?error=Unauthorized");
    }
    const modifiedProps = {
      ...props,
      session: session.data,
    };
    return <Component {...modifiedProps} />;
  };
}
