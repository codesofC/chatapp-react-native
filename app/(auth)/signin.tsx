import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomIcons from '../../components/CustomIcons'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import InputField from '../../components/InputField'
import { useGlobalContext } from '../../context/GlobalContext/useGlobalContext'
import { getUser, signIn } from '../../lib/Firebase'
import { UserProps } from '../../types'

const SignIn = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {setIsConnected, setUser} = useGlobalContext()


  const submitData = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please, fill all inputs!");
    }

    setIsSubmitting(true)

    await signIn(form.email, form.password)
    .then(async (userId) => {
      if(userId){
        await getUser(userId)
        .then(userData => {
          setIsConnected(true)
          setUser(userData as UserProps)
        })
        .catch(error => {
          Alert.alert("Error", "Failed fetching user signIn: ", error.message);
        })
        router.replace("/chatlist")
      }
    })
    .catch((error) => {
      Alert.alert("Error", "Error sign in user: ", error.message)
    })
    .finally(() => {
      setIsSubmitting(false)
    })
  }


  return (
    <SafeAreaView className="relative flex-1 w-full bg-primary">
      <View className="w-full h-full items-center">
        <View className="relative w-24 h-24 my-6">
          <Image
            source={require("../../assets/images/logo2.png")}
            resizeMode="contain"
            className="w-full h-full"
          />
        </View>
        <View className="w-full flex-1 justify-between px-4 py-8 bg-white rounded-t-3xl">
          <View className="items-center">
            <View className="items-center">
              <Text className="text-4xl font-bold"> SnapTalk </Text>
              <Text className="text-secondary-foreground/70">
                {" "}
                Be always with your friends anywhere{" "}
              </Text>
            </View>

            <View className="w-full px-4 flex flex-col mt-4">
            <InputField 
              title='Email'
              type='email-address'
              value={form.email}
              changeFormFn={e => setForm(prev => ({...prev, email: e}))}
            inputStyles='mt-4'
            />

            <InputField 
              title='Password'
              value={form.password}
              changeFormFn={e => setForm(prev => ({...prev, password: e}))}
              inputStyles='mt-8'
            />
            <View className='w-full mt-2'>
              <Link href={'/'} className='text-xs underline text-primary font-bold'> Forget password? </Link>
            </View>

            <CustomButton 
              title='Sign In'
              pressButtonFn={submitData}
              buttonStyle='mt-8 bg-primary'
              textStyle='text-primary-foreground'
              isSubmitting={isSubmitting}
            />   
            <CustomButton
              title="Create Account"
              pressButtonFn={() => router.push("/signup")}
              buttonStyle="mt-4 bg-transparent border border-black"
              textStyle="text-secondary-foreground"
            />
          </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/")}
            className="flex-row items-center"
          >
            <CustomIcons name="chevron-back-sharp" color="#1a91db" />
            <Text className="text-lg text-primary font-bold"> Back </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default SignIn