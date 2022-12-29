import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

// import { Section } from "@/components/common/Section";
import { Tag } from "@/components/common/Tag";

// import { formatDate } from "@/lib/date";
import type { Post as PostType } from ".contentlayer/generated";

type PostsProps = {
  posts: PostType[];
};

export function Posts(props: PostsProps) {
  const { posts } = props;
  // const articleCount = posts?.length;
  return (
    <div className="max-w-[540px] flex flex-col gap-4 w-full mt-10">
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-medium">Writing</h2>
          <p className="font-extralight">
            I write about things I learn and things I do.
          </p>
        </div>

        <div className="self-start p-1 transition-colors duration-200 rounded-full shadow-border-shiny text-silver-700">
          <ArrowTopRightIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <Link
            className="flex flex-col gap-4 p-4 rounded-lg bg-[#1E1E1E] hover:shadow-border-shiny transition-all"
            key={post.slug}
            href={`/posts/${post.slug}`}
          >
            <div>
              <h3 className="text-xl font-medium">{post.title}</h3>
              <p className="text-base font-extralight text-silver-600">
                {post.description}
              </p>
            </div>

            <div className="flex gap-2">
              {post.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
