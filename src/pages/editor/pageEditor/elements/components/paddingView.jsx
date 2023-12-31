export const PaddingView = ({ element, pt, pb, pr, pl }) => {
  return (
    <>
      {pt > 0 && (
        <div
          className={`padding-view absolute top-0 right-0 w-full ${element}`}
          style={{
            paddingTop: pt + "px" || 0,
          }}
        />
      )}
      {pb > 0 && (
        <div
          className={`padding-view absolute bottom-0 right-0 w-full ${element}`}
          style={{
            paddingBottom: pb + "px" || 0,
          }}
        />
      )}
      {pl > 0 && (
        <div
          className={`padding-view absolute top-0 left-0 h-full ${element}`}
          style={{
            paddingLeft: pl + "px" || 0,
          }}
        />
      )}
      {pr > 0 && (
        <div
          className={`padding-view absolute top-0 right-0 h-full ${element}`}
          style={{
            paddingRight: pr + "px" || 0,
          }}
        />
      )}
    </>
  );
};
