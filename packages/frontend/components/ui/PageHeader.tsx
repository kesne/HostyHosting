import Container from './Container';

export default function PageHeader({ children }: { children?: React.ReactNode }) {
    return (
        <header className="bg-white shadow-sm">
            <Container>
                <div className="py-4 px-4 sm:px-0">{children}</div>
            </Container>
        </header>
    );
}
