import { Actionsheet, Box, IActionsheetProps, Modal } from "native-base";
import { IModalProps } from "native-base/lib/typescript/components/composites/Modal";
import React from "react";

//interface Props extends IModalProps {}

interface Props extends IActionsheetProps {}
/*
export default function PopupModal(props: Props) {
  const { isOpen, onClose, avoidKeyboard } = props;
  const modalProps = { isOpen, onClose, avoidKeyboard };
  return (
    <Modal
      {...modalProps}
      animationPreset="slide"
      size="full"
      overlayVisible={false}
      defaultIsOpen={true}
      top="60%"
    >
      <Modal.Content bg="red.100" h="full">
        <Modal.Body _text={{ color: "black" }}></Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
*/

export default function PopupModal(props: Props) {
  return (
    <Actionsheet isOpen={props.isOpen} onClose={props.onClose}>
      <Actionsheet.Content>{props.children}</Actionsheet.Content>
    </Actionsheet>
  );
}
