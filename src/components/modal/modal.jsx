import React from "react";

const Modal = ({ isOpen, size, children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div
        className="fixed top-0 left-0 w-full h-full bg-slate-900/30"
        data-animation="entrance-fade"
      />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div
          className="bg-white rounded-xl overflow-auto fixed min-w-[400px] max-h-[90vh]"
          data-animation={"entrance-bottom"}
          style={{
            width: size,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const ModalHeader = ({ title, subtitle }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle && <p className="text-slate-400">{subtitle}</p>}
    </div>
  );
};

const ModalBody = ({ children }) => {
  return <div className="px-4">{children}</div>;
};

const ModalFooter = ({ children }) => {
  return (
    <div className="sticky bottom-0 w-full bg-slate-100 border-t p-4 rounded-b-xl mt-4">
      {children}
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export { Modal };
