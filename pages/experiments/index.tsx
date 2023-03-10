import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import { ExperimentCard } from "@/components/experiments/ExperimentCard";
import type { Experiments as ExperimentsType } from "@/contentlayer/generated";
import { api } from "@/lib/api";

type ExperimentsPageProps = {
  experiments: ExperimentsType[];
};

export default function Experiments(props: ExperimentsPageProps) {
  return (
    <Layout
      className="flex flex-col justify-center gap-4 p-2"
      customMeta={{
        title: `Kola | Experiments`,
        description: `Recreating some of my favorite ui interactions & building new
            prototypes.`,
      }}
    >
      <Link
        href="/"
        className="flex items-center self-start gap-1 px-2 py-1 text-xs font-normal transition-all border border-transparent rounded bg-cod-gray-500 hover:border-cod-gray-400 w-fit"
      >
        <ArrowLeft className="w-3 h-3 text-silver-700" />
        Home
      </Link>

      <div className="grid gap-2 md:grid-cols-3 2xl:grid-cols-4">
        {props.experiments.map((experiment) => (
          <ExperimentCard {...experiment} key={experiment.slug} />
        ))}
      </div>
      <Footer />
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      experiments: api.getMinimalExperiments(),
    },
  };
};
