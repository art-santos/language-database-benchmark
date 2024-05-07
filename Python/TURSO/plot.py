import matplotlib.pyplot as plt
import numpy as np
from itertools import combinations

x = np.arange(1, 11)

y = [len(list(combinations(range(10), i))) for i in x]

fig, ax = plt.subplots()
ax.plot(x, y)
plt.show()