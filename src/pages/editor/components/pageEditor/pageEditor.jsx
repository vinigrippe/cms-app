import { useEffect, useRef, useState } from "react";

function PageEditor() {
  return (
    <div className="h-[100vh] flex w-full overflow-y-auto">
      <div className="grid grid-cols-2 w-full p-4 gap-4">
        <BoxElement />
        <BoxElement />
      </div>
    </div>
  );
}

function BoxElement() {
  const [elements, setElements] = useState([]);

  return (
    <div
      className=""
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const droppedType = e.dataTransfer.getData("text");
        setElements([...elements, droppedType]);
      }}
    >
      {elements.length === 0 ? (
        <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-5">
          <p>This is a box</p>
          <p className="text-slate-400">Drop elements on me</p>
        </div>
      ) : (
        elements.map((element) => {
          switch (element) {
            case "heading":
              return <HeadingElement />;

            case "text":
              return <TextElement />;

            case "button":
              return <InputElement />;

            default:
              return <TextElement />;
          }
        })
      )}
    </div>
  );
}

const HeadingElement = () => {
  return (
    <span className="relative">
      <textarea
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        rows="1"
        placeholder={"Type some fun text here"}
        className="textareaEditor heading"
      />
    </span>
  );
};

const TextElement = () => {
  return (
    <textarea
      onInput={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }}
      rows="1"
      placeholder={"Type some fun text here"}
      className="textareaEditor text"
    />
  );
};

const InputElement = () => {
  const refButtonEl = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const [value, setValue] = useState("Button");
  const [action, setAction] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refButtonEl.current && !refButtonEl.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refButtonEl]);

  return (
    <span ref={refButtonEl} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        size="10"
        // onInput={(e) => {
        //   var width = e.target.value.length * 8 + 25;
        //   e.target.style.width = width + "px";
        // }}
        className="textareaEditor button"
        onClick={() => {
          setIsFocused(true);
        }}
      />

      {isFocused && (
        <div className="absolute mt-1 bg-white rounded-lg border shadow-lg py-3 px-4 w-[200px] flex flex-col gap-1">
          <div className="grid grid-cols-3 gap-2">
            <p className="text-right">Action:</p>
            <input
              type="text"
              value={action}
              onChange={(e) => {
                setAction(e.target.value);
              }}
              className="col-span-2"
            />
          </div>
        </div>
      )}
    </span>
  );
};

export default PageEditor;
