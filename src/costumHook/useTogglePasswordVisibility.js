import {useState} from 'react';
const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-outline');

  const handlePasswordVisibility = () => {
    // console.log('rightIcon', rightIcon);
    if (rightIcon == 'eye-outline') {
      setRightIcon('eye-off-outline');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon == 'eye-off-outline') {
      setRightIcon('eye-outline');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  return {
    rightIcon,
    passwordVisibility,
    handlePasswordVisibility,
  };
};
export default useTogglePasswordVisibility;
