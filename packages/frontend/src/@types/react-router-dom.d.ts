declare module 'react-router-dom' {
    type Location = import('history').Location;

    export class Navigate extends React.Component<{
        to:
            | string
            | {
                  pathname: string;
                  search?: string;
                  hash?: string;
                  // TODO: Does this work?
                  state?: any;
              };
        replace?: boolean;
        state?: any;
    }> {}

    export function useNavigate(): (
        to: string,
        { replace, state }?: { replace?: boolean; state?: any },
    ) => void;

    export function useParams<T = {}>(): T;
    export function useLocation<T = unknown>(): Location<T>;
    export function useMatch(to: string): boolean;

    export class Routes extends React.Component<{}> {}
    export type RouteProps = {
        children?: React.ReactNode;
        element?: React.ReactElement;
        path: string;
    };
    export class Route extends React.Component<RouteProps> {}
    export class BrowserRouter extends React.Component<{}> {}
    export class Outlet extends React.Component<{}> {}

    type LinkProps = { to: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
    export class Link extends React.Component<LinkProps> {}
}
