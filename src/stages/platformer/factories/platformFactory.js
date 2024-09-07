class PlatformFactory {
  static createPlatforms(platformList) {
    const platforms = [];
    platformList.forEach(platform => {
      platforms.push(new Platform(vec2(platform.x, platform.y), vec2(platform.width, platform.height), new Color(...platform.color)))
    });
    return platforms;
  }
}
