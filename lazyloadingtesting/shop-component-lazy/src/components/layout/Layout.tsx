import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="max-w-[1400px] w-full mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;