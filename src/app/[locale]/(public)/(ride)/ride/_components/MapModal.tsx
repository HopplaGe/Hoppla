import React, { FC } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import DirectionMap from "@/components/shared/maps/DirectionMap";
import { X } from "lucide-react";

type MapModalProps = {
    isOpen: boolean;
    onClose: () => void;
    directionResponse: any;
    openLatLng?: any;
}

const MapModal: FC<MapModalProps> = ({isOpen, onClose, directionResponse, openLatLng}) => {

  return (
    <>
      <Modal 
        size={"full"} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              
              <ModalBody className="p-0">
                <div className="h-full w-full">
                    <Button onPress={onClose} variant="solid" size="lg" color="primary" startContent={<X size={32} />} className="absolute z-50 right-10 top-10"/>
                  <DirectionMap directionResponse={directionResponse} latLng={openLatLng}/>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default MapModal;