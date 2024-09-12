class PlatformFactory {
  static createPlatforms(platformList) {
    const platforms = [];
    platformList.forEach(platform => {
      let platformColor;
      if (platform?.color) {
        platformColor = new Color(...platform.color);
      } else {
        platformColor = new Color(color.red);
      }
      platforms.push(new Platform(vec2(platform.x, platform.y), vec2(platform.width, platform.height), platformColor));
    });
    return platforms;
  }
}
