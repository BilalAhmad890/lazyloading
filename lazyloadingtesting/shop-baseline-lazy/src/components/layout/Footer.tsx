const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="h-[40px] bg-gray-100 flex items-center justify-center">
      <div className="max-w-[1400px] w-full mx-auto px-4 text-center">
        <p className="text-sm text-gray-500">© {currentYear} MyShop</p>
      </div>
    </footer>
  );
};

export default Footer;