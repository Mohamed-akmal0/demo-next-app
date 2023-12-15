import "@styles/global.css";

//creating metadata
export const metadata = {
  title: "Promptopia",
  description: "Discover and share Ai prompts",
};

const RootLayout = ({children}) => {
  return (
    <html>
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
