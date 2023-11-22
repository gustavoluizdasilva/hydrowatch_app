import React, { useState, useEffect } from "react"
import { Text, TextInput, View } from "react-native"
import Styles from "./style_InputGroup"
import { InputGroupProps } from "./interface"

const InputGroup = ({ titleGroup, min, max, onMinChange, onMaxChange }: InputGroupProps) => {
  const [isFocusedMin, setFocusMin] = useState(false);
  const [isFocusedMax, setFocusCMax] = useState(false);
  const [formattedMin, setFormattedMin] = useState("");
  const [formattedMax, setFormattedMax] = useState("");

  useEffect(() => {
    // Atualizar o estado local quando as propriedades 'min' e 'max' mudam
    setFormattedMin(min || "");
    setFormattedMax(max || "");
  }, [min, max]);

  const handleMinChange = (text: string) => {
    // Atualizar o estado local e chamar a função de callback fornecida
    setFormattedMin(text);
    onMinChange && onMinChange(text);
  };

  const handleMaxChange = (text: string) => {
    // Atualizar o estado local e chamar a função de callback fornecida
    setFormattedMax(text);
    onMaxChange && onMaxChange(text);
  };

  return(
      <View>
          <View style={Styles.field}>
              <Text style={Styles.label}>{titleGroup}</Text>
              <View style={Styles.inputGroup}>
                  <TextInput style={[Styles.input, { borderColor: isFocusedMin ? '#6C9F77' : 'black' }]}
                      onFocus={() => setFocusMin(true)}
                      onBlur={() => setFocusMin(false)}
                      onChangeText={handleMinChange}
                      value={min}
                      placeholder="Mínima"
                      placeholderTextColor={isFocusedMin ? '#6C9F77' : 'black' }
                      keyboardType="numeric"/>

                  <TextInput style={[Styles.input, { borderColor: isFocusedMax ? '#6C9F77' : 'black' }]}
                      onFocus={() => setFocusCMax(true)}
                      onBlur={() => setFocusCMax(false)}
                      value={max}
                      onChangeText={handleMaxChange}
                      placeholder="Máxima"
                      placeholderTextColor={isFocusedMax ? '#6C9F77' : 'black' }
                      keyboardType="numeric"/>
              </View>
          </View>
      </View>
  )
}
export default InputGroup
