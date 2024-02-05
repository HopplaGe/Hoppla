"use client";
import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import {Plus} from "lucide-react";
import AddCarForm from "@/components/forms/AddCarForm";
import {useTranslations} from "next-intl";

const AddCarModel = () => {
    const t = useTranslations('MyCars');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [modalPlacement, setModalPlacement] = React.useState("auto");
    return (
        <div className="flex flex-col gap-2">
            <Button
                variant="ghost"
                onPress={onOpen}
                className="relative w-full lg:w-12 h-12 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 focus:bg-white flex justify-center items-center"
            >
                <Plus width={24} height={24} className="text-gray-400"/>
            </Button>
            <Modal
                isOpen={isOpen}
                // @ts-ignore
                placement={modalPlacement}
                onOpenChange={onOpenChange}
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="font-bold text-xl text-secondary fira-go">{t('AddVehicle')}</h2>
                            </ModalHeader>
                            <ModalBody>
                                <AddCarForm onClose={onClose}/>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AddCarModel;
