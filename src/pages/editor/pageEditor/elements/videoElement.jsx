import React, { useContext } from "react";
import { PageEditorContext } from "../../editor";
import { getElement } from "../../editorFunctions";

export const VideoElement = ({ id }) => {
  const { gridElements } = useContext(PageEditorContext);
  const { element } = getElement(gridElements.elements, id);
  const selectedVideo = element.fields.src;

  return (
    <figure
      className={`
      relative ${
        selectedVideo ? "h-full" : "h-[200px]"
      } w-full rounded-[inherit] overflow-hidden`}
      data-type="video"
    >
      {!selectedVideo ? (
        <div className="flex items-center justify-center gap-2 flex-col w-full h-full bg-slate-100 px-5 py-8 cursor-pointer hover:bg-slate-200 transition-all">
          <span className="mgc_video_line text-lg" />
        </div>
      ) : (
        <video
          src={selectedVideo}
          alt="test"
          className="relative z-10 object-cover object-center w-full h-full group-hover/video:opacity-20 transition-all"
          controls
        />
      )}
    </figure>
  );
};
