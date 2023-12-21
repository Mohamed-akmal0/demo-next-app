import { Feed } from "@components/Feed";

const Page = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI-Powered Posts</span>
      </h1>
      <p className="desc text-center">
        This is an open source AI posting tool for modern world to discover ,
        create ad share creative posts
      </p>
      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Page;
