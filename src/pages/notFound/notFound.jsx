import { Button } from "@/components/button/button";
import { Layout } from "@/components/layout/layout";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Layout.Content>
        <div className="flex flex-col items-center justify-center py-32 px-5">
          <div className="flex flex-col items-center gap-3 max-w-[500px]">
            <FaceFrownIcon className="w-[30px] h-[30px]" />
            <h1 className="text-2xl font-semibold text-slate-800">
              Page Not Found
            </h1>
            <p className="text-slate-400 text-center pb-1">
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </p>
            <Button type="ghost" icon="arrow_left" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};
