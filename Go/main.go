package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/:hex", func(c *fiber.Ctx) error {
		hexCode := c.Params("hex")

		// Validate hex code format
		if len(hexCode) != 6 {
			return c.Status(400).SendString("Invalid hex code")
		}

		// Call The Color API
		url := fmt.Sprintf("https://www.thecolorapi.com/id?hex=%s", hexCode)
		resp, err := http.Get(url)
		if err != nil {
			return c.Status(500).SendString("Error fetching color data")
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			return c.Status(500).SendString("Error reading color data")
		}

		// Example: Find the "name.value" field in the JSON response
		colorName := extractColorName(body)

		if colorName != "" {
			return c.SendString(colorName)
		} else {
			return c.Status(404).SendString("Color name not found")
		}
	})

	log.Fatal(app.Listen(":8090"))
}

// Helper function to extract the color name from the API response (Adjust based on API format)

type ColorData struct {
	Name struct {
		Value string `json:"value"`
	} `json:"name"`
}

func extractColorName(jsonData []byte) string {
	var colorData ColorData
	err := json.Unmarshal(jsonData, &colorData)
	if err != nil {
		return ""
	}

	return colorData.Name.Value
}
