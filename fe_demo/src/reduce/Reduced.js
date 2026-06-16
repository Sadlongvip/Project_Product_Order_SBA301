
import { validateField, ValidateOrderInput } from '../validation/Validation';

// state = {
//     values: {
//     username: '',
//     email: '',
//     password: '',
//     phoneNumber: ''
//     },
//     errors: {
//     username: '',
//     email: '',
//     password: '',
//     phoneNumber: ''
//     }
//     touched: {
//     username: false,
//     email: false,
//     password: false,
//     phoneNumber: false
//     }
// };




export function reduceForm(state, action) {
    switch (action.type) {
        case 'OnChange':
            const {field, value} = action.payload;
            const newValues = {...state.values, [field]: value};
            const newErrors = {...state.errors}

            if (state.touched[field]) {
                newErrors[field] = validateField(field, value, newValues);
            }

            if (field === 'password' && state.touched['confirmPassword']) {
                newErrors['confirmPassword'] = validateField('confirmPassword', state.values.confirmPassword, newValues);
            }


            return {
                ...state,
                values: newValues,
                errors: newErrors
            };
        case 'TOUCH_FIELD':
            const { field: touchField, value: touchValue } = action.payload;
            const errorMessage = validateField(touchField, touchValue || state.values[touchField], state.values);
            const newTouched = {
                ...state.touched,
                [touchField]: true
            };
            const newErrors2 = {
                ...state.errors,
                [touchField]: errorMessage
            };


            return {
                ...state,
                touched: newTouched,
                errors: newErrors2
            };
        case 'VALIDATE_FORM':
            const currentErrors = {...state.errors};
            const newTouched2 = {...state.touched};

            Object.keys(state.values).forEach(field => {
                currentErrors[field] = ValidateOrderInput(field, state.values[field], state.values);
                newTouched2[field] = true;
            });
            
            return {
                ...state,
                errors: currentErrors,
                touched: newTouched2
            };
        case 'SET_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.payload
            };
        default:
            return state;
    }
}
// ===========================Order Reduce ===========================
// state = {
//     values: {
//     name: '',
//     quantity: '',
//     price: '',
//     image: '',
//     category: ''
//     },
//     errors: {
//     name: '',
//     quantity: '',
//     price: '',
//     image: '',
//     category: ''
//     }
//     touched: {
//     name: false,
//     quantity: false,
//     price: false,
//     image: false,
//     category: false
//     }
// };
export function reduceOrderForm(state, action) {
    switch (action.type) {
        case 'OnChange':
            const {field, value} = action.payload;
            const newValues = {...state.values, [field]: value};
            const newErrors = {...state.errors}

            if (state.touched[field]) {
                newErrors[field] = ValidateOrderInput(field, value, newValues);
            }

            if (field === 'password' && state.touched['confirmPassword']) {
                newErrors['confirmPassword'] = ValidateOrderInput('confirmPassword', state.values.confirmPassword, newValues);
            }


            return {
                ...state,
                values: newValues,
                errors: newErrors
            };
        case 'TOUCH_FIELD': //payload chỉ gửi tên và mark field đó bị touched
            const touchField = {
                ...state.touched,
                [action.payload.field]: true
            };
            // Validate order form
            const errors = ValidateOrderInput(state.values);
            return {
                ...state,
                touched: touchField,
                errors: errors
            };
        case 'VALIDATE_FORM':
            const currentErrors = {...state.errors};
            const newTouched2 = {...state.touched};

            Object.keys(state.values).forEach(field => {
                currentErrors[field] = ValidateOrderInput(field, state.values[field], state.values);
                newTouched2[field] = true;
            });
            
            return {
                ...state,
                errors: currentErrors,
                touched: newTouched2
            };
        case 'SET_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.payload
            };
        default:
            return state;
    }
}
