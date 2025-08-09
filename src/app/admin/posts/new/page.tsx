import PostForm from "../PostForm";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">New Post</h1>
      {/* @ts-expect-error Server/Client boundary */}
      <PostForm />
    </div>
  );
}
