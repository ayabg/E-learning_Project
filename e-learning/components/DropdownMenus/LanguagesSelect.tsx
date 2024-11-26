"use client"
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const existinglanguages = ["English", "French", "Spanish", "German", "Italian"]

function LanguagesSelect({languages, setlanguages}: {languages: string[], setlanguages: any}) {
    const handleToggleLanguage = (language: string, isChecked: boolean) => {
        setlanguages((prevSelected: string[]) => 
          isChecked 
            ? [...prevSelected, language] 
            : prevSelected.filter(selected => selected !== language)
        );
    };
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-fit">
        <Button variant="outline">Choose languages</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Languages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {existinglanguages.map(language => (
            <DropdownMenuCheckboxItem
            key={language}
            checked={languages.includes(language)}
            onCheckedChange={(isChecked) => handleToggleLanguage(language, isChecked)}
            >
            {language}
            </DropdownMenuCheckboxItem>
        ))}
        </DropdownMenuContent>
    </DropdownMenu>
    );
}

export default LanguagesSelect