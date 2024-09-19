// TomatoCube i2C NeoPixel blocks

/**
 * Well known colors for a NeoPixel strip
 */
enum NeoPixelColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

//% color=#0fbc11 icon="\u272a" block="TomatoCube"
namespace tomatoCube {

  let ledClearData: number[] = []
  let ledSetData: number[] = []
  const NEOPIXEL_I2C_ADDR = 0x45
  
  /**
   * Sets the individual Color of the NeoPixel LED with Common Color.
   * @param Neopixel Number, eg: 2
   * @param color, eg: NeoPixel.Purple
   */
  //% subcategory=NeoPixel(I2C)
  //% blockId="TomatoCube_Neopixel_color" block="set Neopixel LED %ledNumber | with Color %color "
  //% ledNumber.min=0
  //% ledNumber.max=32
  //% weight=93
  export function setNeoColor(ledNumber: number, color: NeoPixelColors) {
      setNeoRGB(ledNumber, ((color >> 16) & 0xFF), ((color >> 8) & 0xFF), ((color) & 0xFF));
  }

  /**
   * Sets the NeoPixel Strip Color with Common Color
   * @param Neopixel Number, eg: 2
   * @param color, eg: NeoPixel.Purple
   */
  //% subcategory=NeoPixel(I2C)
  //% blockId="TomatoCube_Strip_color" block="set Neopixel Strip with Color %color "
  //% weight=92
  export function setStripColor(color: NeoPixelColors) {
      setStripRGB(((color >> 16) & 0xFF), ((color >> 8) & 0xFF), ((color) & 0xFF));
  }

  /**
   * Sets the individual Color of the NeoPixel LED.
   * @param Neopixel Number, eg: 2
   * @param Red Green Blue in the range of 0 to 255, eg: 128
   */
  //% subcategory=NeoPixel(I2C)
  //% blockId="TomatoCube_Neopixel_RGB" block="set Neopixel LED %ledNumber | with Red %ledR Green %ledG Blue %ledB "
  //% ledR.min=0
  //% ledR.max=255
  //% ledG.min=0
  //% ledG.max=255
  //% ledB.min=0
  //% ledB.max=255
  //% ledNumber.min=0
  //% ledNumber.max=32
  //% weight=91
  export function setNeoRGB(ledNumber: number, ledR: number, ledG: number, ledB: number) {
    if (ledNumber < 32) {
        ledSetData = [
            2,
            ledR,
            ledG,
            ledB
        ]
        pins.i2cWriteBuffer(
            NEOPIXEL_I2C_ADDR,
            Buffer.fromArray(ledSetData),
            false
        );

        ledSetData = [
            1,
            ledNumber
        ]
        pins.i2cWriteBuffer(
            NEOPIXEL_I2C_ADDR,
            Buffer.fromArray(ledSetData),
            false
        );

        ledSetData = [
            0,
            2
        ]
        pins.i2cWriteBuffer(
            NEOPIXEL_I2C_ADDR,
            Buffer.fromArray(ledSetData),
            false
        );
        pause(2)
    }
  }

  /**
   * Sets the NeoPixel Strip Color.
   * @param Red Green Blue in the range of 0 to 255, eg: 128
   */
  //% subcategory=NeoPixel(I2C)
  //% blockId="TomatoCube_Strip_RGB" block="set Neopixel Strip with Red %ledR Green %ledG Blue %ledB "
  //% ledR.min=0
  //% ledR.max=255
  //% ledG.min=0
  //% ledG.max=255
  //% ledB.min=0
  //% ledB.max=255
  //% weight=90
  export function setStripRGB(ledR: number, ledG: number, ledB: number) {  
    ledSetData = [
        2,
        ledR,
        ledG,
        ledB
    ]
    pins.i2cWriteBuffer(
        NEOPIXEL_I2C_ADDR,
        Buffer.fromArray(ledSetData),
        false
    );

    ledSetData = [
        1,
        0xff
    ]
    pins.i2cWriteBuffer(
        NEOPIXEL_I2C_ADDR,
        Buffer.fromArray(ledSetData),
        false
    );
    
    ledSetData = [
        0,
        2
    ]
    pins.i2cWriteBuffer(
        NEOPIXEL_I2C_ADDR,
        Buffer.fromArray(ledSetData),
        false
    );

    pause(2)
    
  }

  /**
   * Clear NeoPixel.
   */
  //% subcategory=NeoPixel(I2C)
  //% blockId="TomatoCube_Neopixel_clear" block="clear NeoPixels with Strip Length %ledNumber"
  //% ledNumber.min=0
  //% ledNumber.max=32
  //% weight=89
  export function clearStrip(ledNumber: number) {
    ledSetData = [
        1,
        ledNumber
    ]
    pins.i2cWriteBuffer(
        NEOPIXEL_I2C_ADDR,
        Buffer.fromArray(ledSetData),
        false
    );
    
    ledClearData = [
        0,
        0
    ]
    pins.i2cWriteBuffer(
        NEOPIXEL_I2C_ADDR,
        Buffer.fromArray(ledClearData),
        false
    );
    pause(2)
  }

  /**
   * Apply changes to NeoPixel.
   */
  //% subcategory=NeoPixel(I2C)
  //% blockId="TomatoCube_Neopixel_write" block="apply/write changes to NeoPixel with Strip Length %ledNumber"
  //% ledNumber.min=0
  //% ledNumber.max=32
  //% weight=89
  //% weight=88
  export function writeStrip(ledNumber: number) {
    ledSetData = [
        1,
        ledNumber
    ]
    pins.i2cWriteBuffer(
        NEOPIXEL_I2C_ADDR,
        Buffer.fromArray(ledSetData),
        false
    );
    
    ledSetData = [
        0,
        1
    ]
    pins.i2cWriteBuffer(
        NEOPIXEL_I2C_ADDR,
        Buffer.fromArray(ledSetData),
        false
    );
    pause(2)

  }

}
