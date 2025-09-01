export const validation = (step, values, formIncomplete) => {
  switch (step) {
    case 1:
      if (
        !values.fullName.trim() ||
        !values.email.trim() ||
        !values.jobStatus.trim() ||
        values.consents.length === 0
      ) {
        formIncomplete(true);
        return;
      }
      formIncomplete(false);
      break;

    case 2:
      if (!values.businessType.trim()) {
        formIncomplete(true);
        return;
      }
      formIncomplete(false);
      break;

    case 3:
      if (
        !values.city?.trim() ||
        !values.state?.trim() ||
        !values.country?.trim()
      ) {
        formIncomplete(true);
        return;
      }
      formIncomplete(false);
      break;

    case 4:
      if (!values.minMonthlyRate?.trim() || values.minMonthlyRate === "0") {
        formIncomplete(true);
        return;
      }
      formIncomplete(false);
      break;

    case 5:
      if (!values.workType?.trim()) {
        formIncomplete(true);
        return;
      }
      formIncomplete(false);
      break;

    case 6:
      if (!values.level?.trim()) {
        formIncomplete(true);
        return;
      }
      formIncomplete(false);
      break;

    case 7:
      if (!values.linkedin?.trim()) {
        formIncomplete(true);
        return;
      }
      formIncomplete(false);
      break;

    default:
      break;
  }
};
