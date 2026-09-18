export const generateNameAvatar = (name: string) => {
  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length === 0 || nameParts[0] === "") {
    return "??";
  }
  if (nameParts.length > 1) {
    const firstNameChar = nameParts[0].charAt(0);
    const lastNameChar = nameParts[nameParts.length - 1].charAt(0);
    return (firstNameChar + lastNameChar).toUpperCase();
  } else {
    const singleName = nameParts[0];
    return singleName.substring(0, 2).toUpperCase();
  }
};


