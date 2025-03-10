import { Header } from '../components/header';

export default function Homepage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1"></main>
        </div>
    );
}
