import React, { useContext } from "react";
import { PageEditorContext } from "../pageEditor";
import { getElement } from "../pageEditorService";

export const VideoElement = ({ id }) => {
  const { gridElements, setGridElements } = useContext(PageEditorContext);
  const element = getElement(gridElements, id);

  const selectedVideo = element.fields.src;

  const handleOnChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);

    setGridElements({
      type: "UPDATE_ELEMENT",
      payload: {
        elementId: id,
        change: {
          field: "fields",
          value: { src: url },
        },
      },
    });
  };

  return (
    <figure
      className="relative h-[200px] w-full group/image rounded-lg overflow-hidden"
      data-type="video"
    >
      <label htmlFor={id + "_input"} className="cursor-pointer">
        <input
          id={id + "_input"}
          type="file"
          accept="video/*"
          onChange={handleOnChange}
          style={{ display: "none" }}
        />

        {selectedVideo && (
          <video
            src={selectedVideo}
            alt="test"
            className="relative z-10 object-cover object-center w-full h-full group-hover/video:opacity-20 transition-all"
            controls
          />
        )}

        <div className="absolute top-0 left-0 flex items-center justify-center gap-2 flex-col w-full h-full bg-slate-100 px-5 py-8 cursor-pointer hover:bg-slate-200 transition-all">
          <span className="mgc_video_line text-lg before:!text-blue-600" />
          {!selectedVideo ? (
            <p>
              Select <strong>Video</strong> to add a video to your page.
            </p>
          ) : (
            <p>Select a different video</p>
          )}
        </div>
      </label>
    </figure>
  );
};
