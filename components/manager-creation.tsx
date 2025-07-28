"use client"

import { useState } from "react"
import Image from "next/image"
import { IconCheck, IconClock, IconTrophy, IconUser, IconBuilding, IconEye, IconBriefcase, IconRocket, IconLoader2 } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useManagerCreation, ManagerFormData } from "@/lib/hooks/use-manager-creation"

const steps = [
  { id: 1, name: "Details", icon: IconUser },
  { id: 2, name: "Pick a Club", icon: IconBuilding },
  { id: 3, name: "Appearance", icon: IconEye },
  { id: 4, name: "Experience", icon: IconBriefcase },
  { id: 5, name: "Success", icon: IconRocket },
]

const clubs = [
  {
    id: "chelsea",
    name: "Chelsea",
    logo: "/Chelsea_FC.png",
    league: "Premier League",
    country: "England"
  },
  {
    id: "arsenal", 
    name: "Arsenal",
    logo: "/Arsenal_FC.png",
    league: "Premier League", 
    country: "England"
  },
  {
    id: "liverpool",
    name: "Liverpool",
    logo: "/placeholder-club.svg",
    league: "Premier League",
    country: "England"
  },
  {
    id: "madrid",
    name: "Real Madrid",
    logo: "/placeholder-club.svg", 
    league: "La Liga",
    country: "Spain"
  },
  {
    id: "barcelona",
    name: "FC Barcelona",
    logo: "/placeholder-club.svg",
    league: "La Liga", 
    country: "Spain"
  },
  {
    id: "bayern",
    name: "Bayern Munich",
    logo: "/placeholder-club.svg",
    league: "Bundesliga",
    country: "Germany"
  }
]

export function ManagerCreation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedClub, setSelectedClub] = useState<string | null>(null)
  const [isUnemployed, setIsUnemployed] = useState(false)
  const { loading, error, createManagerAndSave } = useManagerCreation()
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    birthPlace: "",
    dateOfBirth: "",
    favoriteTeam: "",
    coachingLicense: "None",
    playingExperience: "Amateur"
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = async () => {
    try {
      const managerData: ManagerFormData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        nationality: formData.nationality,
        birthPlace: formData.birthPlace,
        dateOfBirth: formData.dateOfBirth,
        favoriteTeam: formData.favoriteTeam,
        selectedClub: selectedClub,
        isUnemployed: isUnemployed,
        coachingLicense: formData.coachingLicense,
        playingExperience: formData.playingExperience,
      }

      await createManagerAndSave(managerData)
    } catch (err) {
      console.error('Failed to create manager:', err)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName.trim() && formData.lastName.trim()
      case 2:
        return selectedClub || isUnemployed
      case 3:
        return true // Appearance step is optional for now
      case 4:
        return true // Experience fields have defaults
      default:
        return true
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="Alex"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Ferguson"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                placeholder="Scotland"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthPlace">Place of Birth</Label>
              <Input
                id="birthPlace"
                value={formData.birthPlace}
                onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                placeholder="Glasgow"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="favoriteTeam">Favorite Team</Label>
              <Input
                id="favoriteTeam"
                value={formData.favoriteTeam}
                onChange={(e) => setFormData({...formData, favoriteTeam: e.target.value})}
                placeholder="Manchester United"
              />
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Choose Your Starting Club</h3>
              <p className="text-muted-foreground">Select a club to manage or start as unemployed</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clubs.map((club) => (
                <Card 
                  key={club.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedClub === club.id && !isUnemployed ? "ring-2 ring-primary" : ""
                  )}
                  onClick={() => {
                    setSelectedClub(club.id)
                    setIsUnemployed(false)
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <Image
                      src={club.logo}
                      alt={club.name}
                      width={64}
                      height={64}
                      className="mx-auto mb-3 rounded-lg"
                    />
                    <h4 className="font-semibold">{club.name}</h4>
                    <p className="text-sm text-muted-foreground">{club.league}</p>
                    <p className="text-xs text-muted-foreground">{club.country}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Card 
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md border-dashed",
                  isUnemployed ? "ring-2 ring-primary" : ""
                )}
                onClick={() => {
                  setIsUnemployed(true)
                  setSelectedClub(null)
                }}
              >
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Start Unemployed</h4>
                    <p className="text-sm text-muted-foreground">
                      Begin your career without a club and search for opportunities
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="text-center py-12">
            <IconEye className="size-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Appearance Customization</h3>
            <p className="text-muted-foreground">Coming soon! You'll be able to customize your manager's appearance.</p>
          </div>
        )
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coachingLicense">Coaching License</Label>
                <select 
                  id="coachingLicense"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={formData.coachingLicense}
                  onChange={(e) => setFormData({...formData, coachingLicense: e.target.value})}
                >
                  <option value="None">None</option>
                  <option value="UEFA C License">UEFA C License</option>
                  <option value="UEFA B License">UEFA B License</option>
                  <option value="UEFA A License">UEFA A License</option>
                  <option value="UEFA Pro License">UEFA Pro License</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="playingExperience">Playing Experience</Label>
                <select 
                  id="playingExperience"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={formData.playingExperience}
                  onChange={(e) => setFormData({...formData, playingExperience: e.target.value})}
                >
                  <option value="Amateur">Amateur</option>
                  <option value="Semi-Professional">Semi-Professional</option>
                  <option value="Professional">Professional</option>
                  <option value="International">International</option>
                </select>
              </div>
            </div>
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">More experience options coming soon!</p>
            </div>
          </div>
        )
      
      case 5:
        return (
          <div className="text-center py-12">
            <IconRocket className="size-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready to Begin!</h3>
            <p className="text-muted-foreground mb-6">
              Your manager {formData.firstName} {formData.lastName} is ready to start their career
              {selectedClub ? ` at ${clubs.find(c => c.id === selectedClub)?.name}` : isUnemployed ? ' as an unemployed manager' : ''}.
            </p>
            
            {error && (
              <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg p-3 text-sm mb-4">
                {error}
              </div>
            )}
            
            <Button 
              size="lg" 
              className="w-full" 
              onClick={handleFinish}
              disabled={loading}
            >
              {loading ? (
                <>
                  <IconLoader2 className="size-4 mr-2 animate-spin" />
                  Creating Manager...
                </>
              ) : (
                "Take Me to the Dashboard"
              )}
            </Button>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Create Your Manager</h1>
              <p className="text-muted-foreground text-balance">
                Set up your managerial career in Boardroom FC
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-center">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                        currentStep >= step.id 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : "border-muted-foreground text-muted-foreground"
                      )}>
                        {currentStep > step.id ? (
                          <IconCheck className="size-5" />
                        ) : (
                          <step.icon className="size-5" />
                        )}
                      </div>
                      <span className="text-xs mt-1 hidden md:block font-medium">{step.name}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "w-8 h-0.5 mx-2 md:mx-4",
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>

            {currentStep < 5 && (
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={currentStep === 1 || loading}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed() || loading}
                >
                  {currentStep === 4 ? "Finish" : "Next"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="text-muted-foreground text-center text-xs text-balance">
        Create your unique manager profile to begin your football management journey.
      </div>
    </div>
  )
} 