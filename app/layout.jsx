import "@styles/global.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
//creating metadata
export const metadata = {
  title: "My Demo App",
  description: "Discover and share Ai prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <Nav />
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
