import React, { useState } from 'react'
import { FormControl, FormField as ShadcnFormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

interface formFieldProps<T extends FieldValues> {
    control : Control<T>;
    name : Path<T>;
    label: string;
    placeholder?: string,
    type:'text' | 'email' | 'password' | 'file'

}

const FormField = <T extends FieldValues>({control, name, label,placeholder,type="text"} : formFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='label'>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input 
                className='input' 
                placeholder={placeholder} 
                {...field} 
                type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
              />
              {isPasswordField && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500 text-sm mt-1" />
        </FormItem>
      )}
    />
  );
}

export default FormField