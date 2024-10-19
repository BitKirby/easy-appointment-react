import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCampus } from "./useCreateCampus";
import { useEditCampus } from "./useEditCampus";

function CreateCampusForm({ campusToEdit = {}, onCloseModal }) {
  const { isCreating, createCampus } = useCreateCampus();
  const { isEditing, editCampus } = useEditCampus();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = campusToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession)
      editCampus(
        { resource: "campuses", data: { ...data }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCampus(
        { resource: "campuses", data: { ...data } },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="校名" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "该项目为必须项",
          })}
        />
      </FormRow>

      <FormRow label="校区相关描述" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit campus" : "Create new campus"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCampusForm;
