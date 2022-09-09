export const handleEntryButton = (data, dataFunction, cpfFilter, filterFunction) => {
  const regexEmailTest = /\S+@\S+\.\S+/;
  const regexDateTest = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (data.name !== ''
    && regexEmailTest.test(data.email)
    && data.cpf.length === 11
    && data.latitude !== ''
    && data.longitude !== ''
    && data.croptype !== ''
    && regexDateTest.test(data.harvestdate)) {
      dataFunction(true);
    } else {
      dataFunction(false);
    }
  if (cpfFilter.cpf.length === 11) {
    filterFunction(true);
  } else {
    filterFunction(false);
  }
}
